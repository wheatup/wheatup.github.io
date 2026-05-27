import { useTitle } from '../../hooks/misc';
import $$ from 'whi18n';

const CopyPasta = () => {
  useTitle($$`copy-pasta`);

  return (
    <section className="CopyPasta">
      CopyPasta
    </section>
  );
}

export default CopyPasta;