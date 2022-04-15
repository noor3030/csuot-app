import axios from "axios";

export async function downloadImage(url: string, name?: string | null): Promise<void> {
  await axios({
    url: url,
    method: "GET",
    responseType: "blob",
  }).then((response) => {
    const fileURL = window.URL.createObjectURL(new Blob([response.data]));
    const fileLink = document.createElement("a");

    fileLink.href = fileURL;
    fileLink.setAttribute("download", `${name}.png`);
    document.body.appendChild(fileLink);

    fileLink.click();
  });
}
