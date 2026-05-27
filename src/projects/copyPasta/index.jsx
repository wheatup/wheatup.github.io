import { useTitle } from '../../hooks/misc';
import $$ from 'whi18n';
import CopyPastaFrame from './copyPasta';

const CopyPasta = () => {
  useTitle($$`copy-pasta`);

  return (
    <section data-component="CopyPasta">
      <CopyPastaFrame />
    </section>
  );
}

export default CopyPasta;
