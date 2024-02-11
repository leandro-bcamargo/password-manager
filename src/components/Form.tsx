type FormProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Form({ handleClick }: FormProps) {
  return (
    <form action="submit">
      <label htmlFor="service-name">Nome do serviço</label>
      <input type="text" id="service-name" />
      <label htmlFor="login">Login</label>
      <input type="text" id="login" />
      <label htmlFor="password">Senha</label>
      <input type="password" />
      <label htmlFor="url">URL</label>
      <input type="text" />
      <button type="submit">Cadastrar</button>
      <button name="cancel" onClick={ handleClick }>Cancelar</button>
    </form>
  );
}
