/**
 * ==============================================================================
 * BASE DATA MODEL / MODELO DE DADOS BASE
 * ==============================================================================
 * PT: Modelo de dados raiz que define as propriedades comuns a todos os documentos.
 * EN: Root data model defining common properties across all documents.
 */

const { StringField } = foundry.data.fields;

/**
 * @extends {foundry.abstract.TypeDataModel<any, any>}
 */
class baseDataModel extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Nome do documento / entidade
      // EN: Document / entity name
      name: new StringField({ required: true }),

      // PT: Descrição ou notas opcionais
      // EN: Optional description or notes
      description: new StringField({ required: false, initial: "" })
    };
  }
}

export { baseDataModel };
