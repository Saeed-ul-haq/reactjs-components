import axios from "axios";
import { getAccessToken, getUploadURL } from "libs/utils/helpers";

export async function uploadPost({
  files,
  onProgress,
  workspaceId = null,
  isPublic = false,
  orgId,
  ...rest
}) {
  const body = new FormData();
  if (Array.isArray(files)) {
    files.map((file) => {
      body.append("files", file);
    });
  } else if (files) {
    body.append("files", files);
  }
  const uploadUrl = getUploadURL(
    orgId,
    workspaceId,
    isPublic,
    rest.needThumbnail
  );
  try {
    const PromiseRespo = axios({
      url: uploadUrl,
      method: "POST",
      data: body,
      "Content-Type": "application/json",
      onUploadProgress: onProgress,
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    return PromiseRespo;
  } catch (error) {
    console.log(error, "Error in uplload method");
  }
}
