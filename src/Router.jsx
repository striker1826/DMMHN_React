import KakaoRedirection from "components/auth/KakaoRedirection";
import DonePage from "pages/DonePage";
import Homepage from "pages/Homepage";
import InterviewPage from "pages/InterviewPage";
import SimulationPage from "pages/SimulationPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Homepage />} />
          <Route path="kakao/callback" element={<KakaoRedirection />} />
          <Route path="interview" element={<InterviewPage />} />
        </Route>
        <Route path="/simulation">
          <Route index element={<SimulationPage />} />
          <Route path="done" element={<DonePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
