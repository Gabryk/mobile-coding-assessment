import { useState } from "react";
import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";

const useDownload = (url: string, onDownloadComplete: () => void) => {
  const [state, setState] = useState({ status: "", uri: "" });

  const download = async () => {
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    if (!fileName) return;

    const permissions =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    if (!permissions.granted) return;

    setState({ status: "loading", uri: "" });

    const localPath = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const downloadResult = await FileSystem.downloadAsync(url, localPath);
      const mimetype = downloadResult.headers["content-type"];

      const base64 = await FileSystem.readAsStringAsync(downloadResult.uri, {
        encoding: "base64",
      });

      const uri = await FileSystem.StorageAccessFramework.createFileAsync(
        permissions.directoryUri,
        fileName,
        mimetype
      );
      await FileSystem.StorageAccessFramework.writeAsStringAsync(uri, base64, {
        encoding: "base64",
      });

      setState({ status: "completed", uri });
      onDownloadComplete();
    } catch (error) {
      setState({ status: "fail", uri: "" });
    }
  };

  const openFile = () => {
    Linking.openURL(state.uri);
  };

  return {
    download,
    openFile,
    ...state,
  };
};

export default useDownload;
