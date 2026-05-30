import { FC, useState } from "react";
import { CircularProgress, IconButton, TableCell, Typography } from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import { toast } from "react-toastify";
import RoomAssetsModal from "./dialog";
import RoomEditModal from "./editModal";
import { updateRoom } from "@src/ifc/services/room.api";


interface IProps {
  index: number;
  room: any;
  refetch: () => void
}

const Row: FC<IProps> = ({
  index,
  room,
  refetch
}) => {
  const [loading, _] = useState(false);
  const [editOpen, setEditOpen] = useState(false);



  const onUpdateRow = async (val: any) => {
    await updateRoom(val).then(() => {
      toast.success('Update successfully')
      refetch();
    }).catch(() => {
      toast.error('Error for update')
    })
  }








  const [open, setOpen] = useState(false);

  return (
    <>
      <TableCell align="left" sx={{ width: { xs: "initial", sm: "5%" } }}>
        <Typography variant="regular14">{index + 1}</Typography>
      </TableCell>


      <TableCell align="left" sx={{ width: { xs: "initial", sm: "15%" } }}>
        <Typography variant="regular14">{room.id}</Typography>
      </TableCell>


      <TableCell align="left" sx={{ width: { xs: "initial", sm: "20%" } }}>
        <Typography variant="regular14">{room.name}</Typography>
      </TableCell>

      <TableCell align="left" sx={{ width: { xs: "initial", sm: "15%" } }}>
        <Typography variant="regular14">{room.longName || '-'}</Typography>
      </TableCell>

      <TableCell align="left" sx={{ width: { xs: "initial", sm: "15%" } }}>
        <Typography variant="regular14">{room.description || '-'}</Typography>
      </TableCell>


      <TableCell align="right" sx={{ width: { xs: "initial", sm: "15%" } }}>
        <IconButton
          // disabled={!canUpdate || loading}
          onClick={() => setOpen(true)}
        >
          {loading ?
            <CircularProgress size={12} />
            :
            <Visibility color="primary" />
          }
        </IconButton>

        <IconButton
          // disabled={!canUpdate || loading}
          onClick={() => setEditOpen(true)}
        >
          {loading ?
            <CircularProgress size={12} />
            :
            <Edit color="primary" />
          }
        </IconButton>

      </TableCell>

      <RoomAssetsModal
        open={open}
        room={room}
        onClose={() => setOpen(false)}
      />

      <RoomEditModal
        open={editOpen}
        room={room}
        onClose={() => setEditOpen(false)}
        onUpdated={(updatedRoom) => {
          onUpdateRow(updatedRoom)
        }}
      />
    </>
  );
};

export default Row;
