import Header from "components/header/Header";
import { LayoutCtn } from "./InterviewPage";
import DoneLayout from "components/interview/DoneLayout";

const DonePage = () => {
  return (
    <LayoutCtn>
      <Header />
      <DoneLayout />
    </LayoutCtn>
  );
};

export default DonePage;
