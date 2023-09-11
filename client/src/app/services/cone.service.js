import httpServece from "./http.service";

const coneEndPoint = "cone";

const coneService = {
  createcone: async (payload) => {
    const { data } = await httpServece.post(coneEndPoint, payload);
    return data;
  },
};

export default coneService;
