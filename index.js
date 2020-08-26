const testLib = {
  participantsTable: [],
  addDocument(file) {
    this.lib
      .addPDFDocument(file)
      .then(() => console.log("document added successfully"));
  },

  addParticipant() {
    const fields = ["email", "document", "name", "role", "signatureType"];

    const participant = fields.reduce((acc, item) => {
      acc[
        item == "signatureType" ? "tipoAssinatura" : item
      ] = this.formParticipant.elements[item].value;
      return acc;
    }, {});
    this.lib.createParticipantSignature(participant);
    this.participantsTable.push(participant);
    this.populateTableParticipants();
  },

  populateTableParticipants() {
    let content = "";
    for (const participant of this.participantsTable) {
      content += `
        <tr>
          <td>${participant.email}</td>
          <td>${participant.document}</td>
          <td>${participant.name}</td>
          <td>${participant.role}</td>
          <td>${participant.tipoAssinatura}</td>
          <td>
            <button class="btn btn__primary" onclick="testLib.lib.updateParticipantSignaturePos('${participant.document}')">Editar</button>
            <button class="btn btn__white" onclick="testLib.removeParticipantSignature('${participant.document}')">Remover</button>
          </td>
        </tr>
      `;
    }
    this.tableParticipants.innerHTML = content;
  },

  updateParticipantSignaturePos(document) {
    this.lib.updateParticipantSignaturePos(document);
  },
  removeParticipantSignature(document) {
    this.lib.removeParticipantSignature(document).then((data) => {
      console.log("Participant removed with successfully");
      this.participantsTable = this.participantsTable.filter(
        (part) => part.document !== document
      );
      this.populateTableParticipants();
    });
  },
  getParticipants() {
    const participantes = this.lib.getParticipants();
    console.log(participantes);
    this.resultParticipants.innerHTML = JSON.stringify(participantes);
  },
  eraseData() {
    this.lib.resetData().then((data) => console.log("Data was erased!"));
  },

  init() {
    this.lib = window.EcertDocsLib;
    this.inputFile = document.querySelector("#inputFile");
    this.btnSelecionar = document.querySelector("#btnSelecionar");
    this.showAllParticipants = document.querySelector("#showAllParticipants");
    this.removeData = document.querySelector("#removeData");
    this.formParticipant = document.querySelector(".form-participant");
    this.btnAdicionarParticipant = document.querySelector(
      "#btnAdicionarParticipant"
    );
    this.tableParticipants = document.querySelector("#tableParticipants");
    this.resultParticipants = document.querySelector("#resultParticipants");

    this.inputFile.addEventListener("click", function () {
      this.value = "";
    });
    this.inputFile.addEventListener("change", (e) =>
      this.addDocument(e.target.files[0])
    );
    this.btnSelecionar.addEventListener("click", () => this.inputFile.click());
    this.showAllParticipants.addEventListener("click", () =>
      this.getParticipants()
    );
    this.removeData.addEventListener("click", () => this.eraseData());
    this.btnAdicionarParticipant.addEventListener("click", () =>
      this.addParticipant()
    );
  },
};
window.addEventListener("load", () => testLib.init());
