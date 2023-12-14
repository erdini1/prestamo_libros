import { UserRepository } from "../repositories/user.repository.js";
import { BookRepository } from "../repositories/book.respository.js";
import { generateCSV } from "../utils/utils.js";

export const exportToCSV = async () => {
  const dataBook = await BookRepository.getAllBooks();
  const dataUser = await UserRepository.getAllUser();

  const fileName = await generateCSV(dataBook);

  const downloadUrl = `api/export-csv/download/${fileName}`;
  return {
    message: "Archivo CSV exportado correctamente.",
    downloadUrl,
  };
};
