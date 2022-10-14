import axios from 'axios';
import { Output } from './output.type';
import { fakeOutputs } from './outputs.fake';

export async function getAllOutputs(): Promise<Output[]> {
  const resp = await axios.get<Output[]>('http://localhost:8080/tasks');
  const data = await resp.data;
  return data;
}

export async function getAllOutputsFake(): Promise<Output[]> {
  const promise = new Promise<Output[]>((resolve, reject) => {
    resolve(fakeOutputs);
  });
  const resp = await promise;
  return resp;
}
