export type HidePasswordsCheckboxProps = {
  handleHidePass: () => void;
};

export default function HidePasswordsCheckbox({ handleHidePass }
: HidePasswordsCheckboxProps) {
  return (
    <div>
      <label htmlFor="hide-passwords">Esconder senhas</label>
      <input
        type="checkbox"
        id="hide-passwords"
        name="hide-passwords"
        onClick={ handleHidePass }
      />
    </div>
  );
}
