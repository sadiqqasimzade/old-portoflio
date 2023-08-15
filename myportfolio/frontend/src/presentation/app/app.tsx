// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector } from 'react-redux';
import { LanguageSelector } from '../components/features/languageSelector/languageSelector';
import { ModalContainer } from '../components/shared/modal/modalContainer';
import { Navbar } from '../components/features/navbar/navbar';
import MainRouter from '../routes/mainRouter';


export function App() {
  return (
    <>
      <Navbar />
      <main>
        <MainRouter />
      </main>
      <LanguageSelector/>
      <ModalContainer/>
    </>
  );
}

export default App;
