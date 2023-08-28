import * as FileSystem from "expo-file-system";
import * as Linking from "expo-linking";
import { useState } from "react";

const useDownload = (url: string, onDownloadComplete: () => void) => {
  const [state, setState] = useState({ status: "", uri: "" });

  const download = async () => {
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    if (!fileName) return;

    setState({ status: "loading", uri: "" });
    const LocalPath = FileSystem.documentDirectory + fileName;

    try {
      const { uri } = await FileSystem.downloadAsync(url, LocalPath);
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
