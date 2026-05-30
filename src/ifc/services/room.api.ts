
import { IApiResponse } from '@src/models/api';
import api from '@src/utils/axios';

import API_ENDPOINTS from '.';
import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '../constants/reactQueryKeys';





interface Params {
  search?: string,
  sortBy?: "name" | "createdAt" | "updatedAt",
  order?: "asc" | "desc",
  modelId?: number | null,
  page?: string;
  limit?: string;
}




const getRooms = async (params: Params) => {
  return await api.get<IApiResponse>(API_ENDPOINTS.dashboard.rooms, {
    params: {
      ...params
    }
  });
};


const useGetRooms = (params: Params) => {
  return useQuery<IApiResponse<any>>({
    queryKey: [ReactQueryKeys.rooms, params],
    queryFn: async () => {
      const response = await getRooms(params);
      return response.data;
    },
  });
}





const updateRoom = async (data: any) => {
  return await api.patch<IApiResponse>(API_ENDPOINTS.dashboard.update_room(data.id), data);
};













export {
  useGetRooms,
  updateRoom
};
