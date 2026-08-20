/**
 * ==============================================================================
 * BASE DATA MODEL / MODELO DE DADOS BASE
 * ==============================================================================
 * PT: Modelo de dados raiz que define as propriedades comuns a todos os documentos.
 * EN: Root data model defining common properties across all documents.
 */

const { StringField, NumberField, ArrayField, SchemaField } = foundry.data.fields;

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
        new SchemaField({
          name: new StringField({ required: false, initial: "" }),
          type: new StringField({ required: true, initial: "attack" }),
          attackFormula: new StringField({ required: false, initial: "" }),
          damageFormula: new StringField({ required: false, initial: "" }),
          damageType: new StringField({ required: false, initial: "" }),
          saveAbility: new StringField({ required: false, initial: "" }),
          saveDC: new NumberField({ required: false, integer: true, min: 0, initial: 10 })
        }),
        { required: true, initial: [] }
      )
    };
  }
}

export { BaseDataModel };
