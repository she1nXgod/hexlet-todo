type PageTitleProps = {
  children: React.ReactNode;
};

const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div className='row text-center min-vw-100 mt-5 logo'>
      <h1 className='col'>{children}</h1>
    </div>
  );
};

export default PageTitle;
