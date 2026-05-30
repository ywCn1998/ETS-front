
import { IApiResponse } from '@src/models/api';
import { IAccess, IBusinessUnit, ILoginResponse } from '@src/models/auth';
import { IUserLogin } from '@src/models/user';
import api from '@src/utils/axios';

import API_ENDPOINTS from '.';
import { useQuery } from '@tanstack/react-query';
import ReactQueryKeys from '../constants/reactQueryKeys';



const loginUser = async (data: IUserLogin) => {
  return await api.post<IApiResponse<ILoginResponse>>(API_ENDPOINTS.auth.login, data);
};



const refreshToken = async (token: string) => {
  return await api.post<IApiResponse<ILoginResponse>>(API_ENDPOINTS.auth.refresh_token, token);
};




const getBusinessUnit = async () => {
  return await api.get<IApiResponse>(API_ENDPOINTS.auth.businessunit);
};



const useGetBusinessUnit = () => {
  return useQuery<IApiResponse<IBusinessUnit[]>>({
    queryKey: [ReactQueryKeys.businessunit],
    queryFn: async () => {
      const response = await getBusinessUnit();
      return response.data;
    },
  });
}




const getSalesChannel = async (id: string) => {
  console.log('i222d', id)
  return await api.get<IApiResponse>(API_ENDPOINTS.auth.saleschannel(id));
};



const useGetSalesChannel = (id: string) => {
  return useQuery<IApiResponse<IBusinessUnit[]>>({
    queryKey: [ReactQueryKeys.saleschannel, id],
    queryFn: async () => {
      const response = await getSalesChannel(id);
      return response.data;
    },
    enabled: id === undefined ? true : false
  });
}




const sendBusinessUnit = async ({
  pannel,
  salesChannelId
}: {
  pannel: number,
  salesChannelId: number
}
) => {
  return await api.post<IApiResponse>(API_ENDPOINTS.auth.set_saleschannel + `?businessUnitId=${pannel}&salesShopId=${salesChannelId}`);
};






const getAccountAccess = async () => {
  return await api.get<IApiResponse>(API_ENDPOINTS.auth.user_access);
};



const useGetAccountAccess = () => {
  return useQuery<IApiResponse<IAccess[]>>({
    queryKey: [ReactQueryKeys.access],
    queryFn: async () => {
      const response = await getAccountAccess();
      return response.data;
    },
  });
}








export {
  loginUser,
  refreshToken,
  getBusinessUnit,
  useGetBusinessUnit,
  sendBusinessUnit,
  useGetSalesChannel,
  useGetAccountAccess
};
