import PageTitle from './components/PageTitle';

const App = () => {
  return (
    <>
      <div className='video-background'>
        <video
          autoPlay
          muted
          loop
          preload='metadata'
          playsInline
          id='myVideo'
          poster='background-room.png'
        >
          <source src='background-room.mp4' type='video/mp4' />
        </video>
      </div>
      <PageTitle>Todo</PageTitle>
    </>
  );
};

export default App;
