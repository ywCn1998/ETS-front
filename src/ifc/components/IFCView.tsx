import { useEffect, useRef, useState } from "react";
import { IfcViewerAPI } from "web-ifc-viewer";
import { Color, MeshLambertMaterial } from "three";
import {
  IFCSLAB, IFCCOLUMN, IFCDOOR, IFCWINDOW, IFCMEMBER,
  IFCWALL, IFCWALLSTANDARDCASE, IFCBEAM, IFCSTAIR, IFCROOF,
  IFCFURNISHINGELEMENT, IFCFLOWTERMINAL, IFCBUILDINGELEMENTPROXY,
  IFCCOVERING, IFCPLATE,
} from "web-ifc";

const API_URL = "https://ets-backend-vv91.onrender.com/api";
const TOKEN = () => localStorage.getItem("token") ?? "";

type IfcViewerInstance = InstanceType<typeof IfcViewerAPI>;
type LayerKey =
  | "walls" | "wallCases" | "beams" | "stairs" | "roofs"
  | "furnitures" | "terminals" | "proxies" | "coverings" | "plates"
  | "slabs" | "columns" | "doors" | "windows" | "members";

interface LayerState {
  slabs: boolean; columns: boolean; doors: boolean; windows: boolean;
  walls: boolean; wallCases: boolean; beams: boolean; members: boolean;
  stairs: boolean; roofs: boolean; furnitures: boolean; terminals: boolean;
  proxies: boolean; coverings: boolean; plates: boolean;
}

const INITIAL_LAYERS: LayerState = {
  slabs: true, columns: true, doors: true, windows: true, members: true,
  beams: true, coverings: true, furnitures: true, plates: true,
  proxies: true, roofs: true, stairs: true, terminals: true,
  wallCases: true, walls: true,
};

const EMPTY_LAYER_IDS = (): Record<LayerKey, Set<number>> => ({
  slabs: new Set(), columns: new Set(), doors: new Set(), windows: new Set(),
  members: new Set(), beams: new Set(), coverings: new Set(), furnitures: new Set(),
  plates: new Set(), proxies: new Set(), roofs: new Set(), stairs: new Set(),
  terminals: new Set(), wallCases: new Set(), walls: new Set(),
});

const LAYER_TYPES: Record<LayerKey, number[]> = {
  doors: [IFCDOOR], windows: [IFCWINDOW], slabs: [IFCSLAB],
  columns: [IFCCOLUMN], members: [IFCMEMBER], walls: [IFCWALL],
  wallCases: [IFCWALLSTANDARDCASE], beams: [IFCBEAM], stairs: [IFCSTAIR],
  roofs: [IFCROOF], furnitures: [IFCFURNISHINGELEMENT],
  terminals: [IFCFLOWTERMINAL], proxies: [IFCBUILDINGELEMENTPROXY],
  coverings: [IFCCOVERING], plates: [IFCPLATE],
};

const BUTTONS: { key: LayerKey; label: string; icon: string }[] = [
  { key: "slabs", label: "Floors", icon: "ti-layout-bottombar" },
  { key: "columns", label: "Columns", icon: "ti-layout-sidebar" },
  { key: "members", label: "Structure", icon: "ti-vector-triangle" },
  { key: "walls", label: "Walls", icon: "ti-wall" },
  { key: "wallCases", label: "Wall Cases", icon: "ti-wall" },
  { key: "beams", label: "Beams", icon: "ti-minus" },
  { key: "stairs", label: "Stairs", icon: "ti-stairs" },
  { key: "roofs", label: "Roof", icon: "ti-home" },
  { key: "doors", label: "Doors", icon: "ti-door" },
  { key: "windows", label: "Windows", icon: "ti-border-outer" },
  // { key: "furnitures", label: "Furniture", icon: "ti-armchair" },
  // { key: "terminals", label: "Terminals", icon: "ti-plug" },
  // { key: "coverings", label: "Coverings", icon: "ti-layers-subtract" },
  // { key: "plates", label: "Plates", icon: "ti-square" },
  // { key: "proxies", label: "Proxies", icon: "ti-cube" },
];

const IFCSPACE = 3856911033;
const IFCRELCONTAINEDINSPATIALSTRUCTURE = 3242617779;

// ── API helpers ────────────────────────────────────────
const authFetch = (url: string, options: RequestInit = {}) =>
  fetch(url, {
    ...options,
    headers: {
      ...(options.headers ?? {}),
      Authorization: `Bearer ${TOKEN()}`,
    },
  });

const checkFileOnServer = async (): Promise<{ exists: boolean; fileName?: string }> => {
  try {
    const res = await authFetch(`${API_URL}/files`);
    const json = await res.json();
    if (!json.success || !json.data?.length) return { exists: false };
    return { exists: true, fileName: json.data[0].fileName };
  } catch {
    return { exists: false };
  }
};

const uploadFileToServer = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await authFetch(`${API_URL}/files/upload`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data.storedName;
};

// ── Component ──────────────────────────────────────────
export default function IfcViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<IfcViewerInstance | null>(null);
  const initializedRef = useRef(false);
  const modelIDRef = useRef<number | null>(null);
  const fileNameRef = useRef<string>("");

  const layerIdsRef = useRef<Record<LayerKey, Set<number>>>(EMPTY_LAYER_IDS());
  const groupMaterialMapRef = useRef<Map<number, { layer: LayerKey; mat: MeshLambertMaterial }>>(new Map());
  const layersRef = useRef<LayerState>(INITIAL_LAYERS);
  const selectedFileRef = useRef<File | null>(null);

  const [layers, setLayers] = useState<LayerState>(INITIAL_LAYERS);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [checking, setChecking] = useState(true);
  const [hasFile, setHasFile] = useState(false);

  // ── Initialize viewer ──────────────────────────────────
  useEffect(() => {
    if (!containerRef.current || initializedRef.current) return;
    initializedRef.current = true;

    const viewer = new IfcViewerAPI({
      container: containerRef.current,
      backgroundColor: new Color(0x1a1a2e),
    });

    viewer.IFC.loader.ifcManager.useWebWorkers(false);
    viewer.IFC.loader.ifcManager.setWasmPath("/wasm/");
    viewer.IFC.setWasmPath("/wasm/");
    viewer.grid.setGrid();
    viewer.axes.setAxes();

    window.addEventListener("click", async () => { await viewer.IFC.selector.pickIfcItem(); });
    window.addEventListener("mousemove", () => { viewer.IFC.selector.prePickIfcItem(); });

    viewerRef.current = viewer;

    return () => {
      viewerRef.current?.dispose();
      viewerRef.current = null;
      initializedRef.current = false;
    };
  }, []);

  // ── Check server for existing file on mount ────────────
  useEffect(() => {
    const init = async () => {
      setChecking(true);
      const { exists, fileName } = await checkFileOnServer();
      if (exists && fileName) {
        setHasFile(true);
        await loadFromServer(fileName);
      }
      setChecking(false);
    };
    init();
  }, []);

  // ── Helpers ────────────────────────────────────────────
  const clearModel = (viewer: IfcViewerInstance) => {
    if (modelIDRef.current !== null) {
      viewer.IFC.loader.ifcManager.ifcAPI.CloseModel(modelIDRef.current);
      modelIDRef.current = null;
    }
    groupMaterialMapRef.current.clear();
    layerIdsRef.current = EMPTY_LAYER_IDS();
  };

  const buildLayerIds = async (manager: any, modelID: number) => {
    for (const [layer, types] of Object.entries(LAYER_TYPES)) {
      const idSet = new Set<number>();
      for (const type of types) {
        const ids = await manager.getAllItemsOfType(modelID, type, false);
        ids.forEach((i: number) => idSet.add(i));
      }
      layerIdsRef.current[layer as LayerKey] = idSet;
    }
  };

  const buildGroupMaterialMap = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    viewer.context.items.ifcModels.forEach((ifcModel: any) => {
      if (!ifcModel.isMesh) return;

      const geometry = ifcModel.geometry;
      const index = geometry.index;
      const expressIDAttr = geometry.attributes.expressID;
      const groups = geometry.groups;
      const originalMats = ifcModel.material as MeshLambertMaterial[];

      const groupToExpressIDs = new Map<number, Set<number>>();
      groups.forEach((group: any, groupIdx: number) => {
        const idSet = new Set<number>();
        const end = group.start + group.count;
        for (let i = group.start; i < end; i++) {
          idSet.add(expressIDAttr.getX(index ? index.getX(i) : i));
        }
        groupToExpressIDs.set(groupIdx, idSet);
      });

      const layerKeys = Object.keys(LAYER_TYPES) as LayerKey[];
      const groupLayerMap = new Map<number, LayerKey>();

      groupToExpressIDs.forEach((expressIDs, groupIdx) => {
        for (const layer of layerKeys) {
          const targetIds = layerIdsRef.current[layer];
          let hasTarget = false;
          let hasNonTarget = false;
          for (const eid of expressIDs) {
            if (targetIds.has(eid)) hasTarget = true;
            else hasNonTarget = true;
          }
          if (hasTarget && !hasNonTarget) {
            groupLayerMap.set(groupIdx, layer);
            break;
          }
        }
      });

      const newMats = originalMats.map((m) => m.clone());
      ifcModel.material = newMats;

      groupLayerMap.forEach((layer, groupIdx) => {
        const mat = newMats[groups[groupIdx].materialIndex];
        groupMaterialMapRef.current.set(groupIdx, { layer, mat });
      });
    });
  };

  // ── Load from server ───────────────────────────────────
  const loadFromServer = async (storedFileName: string) => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    setLoading(true);
    setModelReady(false);
    clearModel(viewer);

    try {
      fileNameRef.current = storedFileName.replace(/^\d+-/, "");
      const url = `${API_URL}/files/${storedFileName}`;

      const model = await viewer.IFC.loadIfcUrl(url);
      modelIDRef.current = model.modelID;

      await buildLayerIds(viewer.IFC.loader.ifcManager, model.modelID);
      buildGroupMaterialMap();
      viewer.context.fitToFrame();
      setModelReady(true);
    } catch (error) {
      console.error("Failed to load from server:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Load from local file ───────────────────────────────
  const loadIFCFile = async (file: File) => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    setLoading(true);
    setModelReady(false);
    setSyncStatus("idle");
    clearModel(viewer);

    try {
      fileNameRef.current = file.name;
      const url = URL.createObjectURL(file);
      const model = await viewer.IFC.loadIfcUrl(url);
      URL.revokeObjectURL(url);

      modelIDRef.current = model.modelID;

      await buildLayerIds(viewer.IFC.loader.ifcManager, model.modelID);
      buildGroupMaterialMap();
      viewer.context.fitToFrame();
      setModelReady(true);
    } catch (error) {
      console.error("Failed to load IFC:", error);
    } finally {
      setLoading(false);
    }
  };

  // ── Extract model data ─────────────────────────────────
  const extractModelData = async () => {
    const viewer = viewerRef.current;
    if (!viewer || modelIDRef.current === null) return null;

    const manager = viewer.IFC.loader.ifcManager;
    const modelID = modelIDRef.current;

    const spaceIds = await manager.getAllItemsOfType(modelID, IFCSPACE, false);
    const rooms = await Promise.all(
      spaceIds.map(async (id: number) => {
        const props = await manager.getItemProperties(modelID, id);
        const psets = await manager.getPropertySets(modelID, id);
        const properties: Record<string, any> = {};
        for (const pset of psets) {
          if (!pset.HasProperties) continue;
          for (const prop of pset.HasProperties) {
            const key = prop.Name?.value;
            const value = prop.NominalValue?.value ?? prop.Value?.value ?? null;
            if (key) properties[key] = value;
          }
        }
        return {
          expressID: id,
          name: props.Name?.value ?? `Space_${id}`,
          longName: props.LongName?.value ?? null,
          description: props.Description?.value ?? null,
          attributes: properties,
        };
      })
    );

    const ASSET_TYPES: Record<string, number> = {
      door: IFCDOOR, window: IFCWINDOW,
      slab: IFCSLAB, column: IFCCOLUMN,
      member: IFCMEMBER,
    };

    const assets: any[] = [];
    for (const [type, typeCode] of Object.entries(ASSET_TYPES)) {
      const ids = await manager.getAllItemsOfType(modelID, typeCode, false);
      for (const id of ids) {
        const props = await manager.getItemProperties(modelID, id);
        const psets = await manager.getPropertySets(modelID, id);
        const properties: Record<string, any> = {};
        for (const pset of psets) {
          if (!pset.HasProperties) continue;
          for (const prop of pset.HasProperties) {
            const key = prop.Name?.value;
            const value = prop.NominalValue?.value ?? prop.Value?.value ?? null;
            if (key) properties[key] = value;
          }
        }
        assets.push({
          expressID: id,
          type,
          name: props.Name?.value ?? `${type}_${id}`,
          description: props.Description?.value ?? null,
          tag: props.Tag?.value ?? null,
          attributes: properties,
        });
      }
    }

    const relIds = await manager.getAllItemsOfType(
      modelID, IFCRELCONTAINEDINSPATIALSTRUCTURE, false
    );
    const roomAssetMap: Record<number, number[]> = {};
    for (const relId of relIds) {
      const rel = await manager.getItemProperties(modelID, relId);
      const structureId = rel.RelatingStructure?.value;
      const elements = rel.RelatedElements ?? [];
      if (structureId) {
        roomAssetMap[structureId] = elements.map((e: any) => e.value);
      }
    }

    return { fileName: fileNameRef.current, rooms, assets, roomAssetMap };
  };

  // ── Sync to backend ────────────────────────────────────
  const syncToBackend = async (file?: File) => {
    setSyncing(true);
    setSyncStatus("idle");
    try {

      const fileToUpload = file ?? selectedFileRef.current;
      // 1. Upload file if provided
      if (fileToUpload) {
        await uploadFileToServer(fileToUpload);
      }

      // if (file) await uploadFileToServer(file);

      // 2. Extract data from loaded model
      const data = await extractModelData();
      if (!data) throw new Error("No model loaded");

      // 3. Send to backend
      const res = await authFetch(`${API_URL}/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(await res.text());
      setSyncStatus("success");
    } catch (error) {
      console.error("Sync failed:", error);
      setSyncStatus("error");
    } finally {
      setSyncing(false);
    }
  };

  // ── Toggle layer ───────────────────────────────────────
  const toggleLayer = (layer: LayerKey) => {
    const newVisible = !layersRef.current[layer];
    layersRef.current = { ...layersRef.current, [layer]: newVisible };
    setLayers({ ...layersRef.current });

    groupMaterialMapRef.current.forEach(({ layer: groupLayer, mat }) => {
      if (groupLayer !== layer) return;
      mat.transparent = true;
      mat.opacity = newVisible ? 1 : 0;
      mat.depthWrite = newVisible;
      mat.needsUpdate = true;
    });
  };

  // ── Drag and drop ──────────────────────────────────────
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.name.endsWith(".ifc")) {
      loadIFCFile(file).then(() => syncToBackend(file));
    }
  };

  // ── Shared button style ────────────────────────────────
  const btnStyle = (active = true, color?: string): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 8,
    padding: "8px 14px",
    background: color ?? (active ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.5)"),
    border: `1px solid ${active ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.15)"}`,
    borderRadius: 8,
    color: active ? "white" : "rgba(255,255,255,0.4)",
    fontSize: 14, cursor: "pointer",
    backdropFilter: "blur(6px)",
    transition: "all 0.2s",
    minWidth: 160,
  });

  // ── Render ─────────────────────────────────────────────
  return (
    <div
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* 3D canvas */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>

      {/* ── Checking server ── */}
      {checking && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.85)", gap: 12,
        }}>
          <i className="ti ti-loader" style={{
            fontSize: 36, color: "white",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: 15 }}>
            Checking for existing model...
          </p>
        </div>
      )}

      {/* ── Upload overlay ── */}
      {!checking && !hasFile && !modelReady && !loading && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)", gap: 16,
        }}>
          <i className="ti ti-building" style={{ fontSize: 56, color: "rgba(255,255,255,0.3)" }} />
          <p style={{ color: "white", fontSize: 20, margin: 0, fontWeight: 500 }}>
            No model found on server
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: 0 }}>
            Drag & drop or click below to upload an IFC file
          </p>
          <label style={{
            padding: "10px 28px",
            background: "rgba(99,102,241,0.4)",
            border: "1px solid rgba(99,102,241,0.7)",
            borderRadius: 8, color: "white",
            fontSize: 15, cursor: "pointer",
          }}>
            <i className="ti ti-upload" style={{ marginRight: 8 }} />
            Choose IFC file
            <input
              type="file" accept=".ifc"
              style={{ display: "none" }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                await loadIFCFile(file);   // render in viewer
                selectedFileRef.current = file;
                setHasFile(true);          // hide overlay
              }}
            />
          </label>
        </div>
      )}

      {/* ── Loading spinner ── */}
      {loading && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)", gap: 12,
        }}>
          <i className="ti ti-loader" style={{
            fontSize: 40, color: "white",
            animation: "spin 1s linear infinite",
          }} />
          <p style={{ color: "white", margin: 0, fontSize: 15 }}>
            Loading {fileNameRef.current}...
          </p>
        </div>
      )}

      {/* ── Controls ── */}
      {modelReady && (
        <>
          {/* Layer toggles — left panel */}
          <div style={{
            position: "absolute", top: 20, left: 20,
            display: "flex", flexDirection: "column", gap: 6,
            maxHeight: "calc(100vh - 40px)",
            overflowY: "auto",
          }}>
            {BUTTONS.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => toggleLayer(key)}
                style={btnStyle(layers[key])}
              >
                <i className={`ti ${icon}`} style={{ fontSize: 15 }} />
                {layers[key] ? "Hide" : "Show"} {label}
              </button>
            ))}

            <button
              onClick={() => viewerRef.current?.context.fitToFrame()}
              style={{ ...btnStyle(), marginTop: 8 }}
            >
              <i className="ti ti-focus-2" style={{ fontSize: 15 }} />
              Fit view
            </button>
          </div>

          {/* Action buttons — right panel */}
          <div style={{
            position: "absolute", top: 20, right: 20,
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            {/* Load new IFC */}
            <label style={btnStyle()}>
              <i className="ti ti-refresh" style={{ fontSize: 15 }} />
              Load new IFC
              <input
                type="file" accept=".ifc"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  selectedFileRef.current = file;
                  await loadIFCFile(file);

                  // await syncToBackend(file);
                }}
              />
            </label>

            {/* Sync to DB */}
            <button
              onClick={() => syncToBackend()}
              disabled={syncing}
              style={{
                ...btnStyle(),
                background:
                  syncStatus === "success" ? "rgba(34,197,94,0.25)"
                    : syncStatus === "error" ? "rgba(239,68,68,0.25)"
                      : "rgba(99,102,241,0.3)",
                border: `1px solid ${syncStatus === "success" ? "rgba(34,197,94,0.6)"
                  : syncStatus === "error" ? "rgba(239,68,68,0.6)"
                    : "rgba(99,102,241,0.6)"
                  }`,
                opacity: syncing ? 0.7 : 1,
                cursor: syncing ? "not-allowed" : "pointer",
              }}
            >
              <i
                className={`ti ${syncing ? "ti-loader" :
                  syncStatus === "success" ? "ti-check" :
                    syncStatus === "error" ? "ti-x" :
                      "ti-database"
                  }`}
                style={{
                  fontSize: 15,
                  animation: syncing ? "spin 1s linear infinite" : "none",
                }}
              />
              {syncing ? "Syncing..." :
                syncStatus === "success" ? "Synced!" :
                  syncStatus === "error" ? "Failed" :
                    "Sync to DB"}
            </button>

            {/* View rooms */}
            <button
              onClick={() => window.open("/dashboard/rooms", "_blank")}
              style={btnStyle()}
            >
              <i className="ti ti-list" style={{ fontSize: 15 }} />
              View Rooms
            </button>
          </div>
        </>
      )}
    </div>
  );
}
