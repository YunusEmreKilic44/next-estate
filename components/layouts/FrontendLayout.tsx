import Footer from "../general/Footer";

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Footer />
    </>
  );
};

export default FrontendLayout;
