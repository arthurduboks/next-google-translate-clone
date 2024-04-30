"use client";

import { MicIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const mimeType = "audio/webm";

function Recorder({ uploadAudio }: { uploadAudio: (blob: Blob) => void }) {
  const [permission, setPermission] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    askPermission();
  }, []);

  const askPermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err: any) {
        alert(err.message);
      }
    } else {
      alert("Your browser does not support the MediaRecorder.");
    }
  };

  return (
    <div>
      <MicIcon size={20} className="group-hover:underline" />
      {!permission && (
        <button onClick={askPermission}>Allow microphone access</button>
      )}
    </div>
  );
}

export default Recorder;
