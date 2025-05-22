import { api } from "@/utils/api";

export async function getGuid() {
  const res = await api<string>('/Upload/getbatchNo');
  console.log('getGuid', res);
  return res;
}

export async function uploadFile(files: File[], guid: string) {
  const formData = new FormData();
  for (const file of files) {
    formData.append('files', file); // 如果後端是 IFormFileCollection files
  }
  formData.append('uuid', guid);
  await api<void>('/Upload/transaction', {
    method: 'POST',
    data: formData
  });

}
