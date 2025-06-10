import MuxPlayer from "@mux/mux-player-react";

function Player({ token }: { token: string }) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={"CYzbq902WjrWLkQUp8xcXLyFFW4GLiTVQFWE01alPlJJE"}
      tokens={{ playback: token }}
    />
  );
}

export default Player;
