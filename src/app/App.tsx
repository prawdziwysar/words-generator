import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import useWebRtcContextInit from "./webRtcContext/useWebRtcContextInit";
import Error404 from "./routes/404/react/Error404";
import Main from "./routes/main/react/Main";
import Chat from "./routes/chat/react/Chat";
import WebRtcContext from "./webRtcContext/WebRtcContext";

function App() {
  const value = useWebRtcContextInit();

  return (
    <WebRtcContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/" element={<Main/>} />
          <Route path="*" element={<Error404/>} />
        </Routes>
      </Router>
    </WebRtcContext.Provider>
  );
}

export default App;
