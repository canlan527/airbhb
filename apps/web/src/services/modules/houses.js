import request from "../request";

export function getHouseDetail(id) {
  return request.get({ url: `/houses/${id}` });
}
