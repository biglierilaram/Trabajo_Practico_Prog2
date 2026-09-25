export class ItemYaListoException extends Error {
  constructor(nombreItem: string) {
    super(`El item "${nombreItem}" ya está listo y no puede modificarse.`);
  }
}