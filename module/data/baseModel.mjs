/**
 * ==============================================================================
 * BASE DATA MODEL / MODELO DE DADOS BASE
 * ==============================================================================
 * PT: Modelo de dados raiz que define as propriedades comuns a todos os documentos.
 * EN: Root data model defining common properties across all documents.
 */

import { ActionDataModel } from "./ActionModel.mjs";

const { StringField, ArrayField, EmbeddedDataField } = foundry.data.fields;

/**
 * @extends {foundry.abstract.TypeDataModel<any, any>}
 */
class BaseDataModel extends foundry.abstract.TypeDataModel {
  /** @override */
  static defineSchema() {
    return {
      // PT: Nome do documento / entidade
      // EN: Document / entity name
      name: new StringField({ required: true }),

      // PT: Descrição ou notas opcionais
      // EN: Optional description or notes
      description: new StringField({ required: false, initial: "" }),

      // PT: Lista de ações configuradas (ataques, habilidades, magias)
      // EN: List of configured actions (attacks, abilities, spells)
      actions: new ArrayField(
        new EmbeddedDataField(ActionDataModel),
        { required: true, initial: [] }
      )
    };
  }
}

export { BaseDataModel };
