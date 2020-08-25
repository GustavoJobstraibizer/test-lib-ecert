const testLib = {
  participantsTable: [],
  addDocument(file) {
    this.lib.addPDFDocument(file).then(() => console.log("document added successfully"));
  },

  addParticipant() {
    const fields = ["email", "document", "name", "role", "signatureType"];

    const participant = fields.reduce((acc, item) => {
      acc[item == "signatureType" ? "tipoAssinatura" : item] = this.formParticipant.elements[item].value;
      return acc;
    }, {});
    console.log(participant);
    // const participant = {
    //   email: "joao_dasilva@fakemail.com",
    //   document: "537.871.660-84",
    //   name: "João da Silva",
    //   role: "CONTRATANTE",
    //   tipoAssinatura: 1,
    // };
    this.lib.createParticipantSignature(participant);
    this.participantsTable.push(participant);
    this.populateTableParticipants();
  },

  populateTableParticipants() {
    debugger;
    let content = "";
    for (const participant of this.participantsTable) {
      content += `
        <tr>
          <td>${participant.email}</td>
          <td>${participant.document}</td>
          <td>${participant.name}</td>
          <td>${participant.role}</td>
          <td>${participant.tipoAssinatura}</td>
          <td><button class="btn btn__primary" onclick="testLib.removeParticipantSignature('${participant.document}')">Remover</button></td>
        </tr>
      `;
    }
    this.tableParticipants.innerHTML = content;
  },

  updateParticipantSignaturePos(document) {
    this.lib.updateParticipantSignaturePos(document);
  },
  removeParticipantSignature(document) {
    debugger;
    this.lib.removeParticipantSignature(document).then((data) => {
      console.log("Participant removed with successfully");
      this.participantsTable = this.participantsTable.filter((part) => part.document !== document);
      this.populateTableParticipants();
    });
  },
  getParticipants() {
    console.log(this.lib.getParticipants());
  },
  eraseData() {
    this.lib.resetData().then((data) => console.log("Data was erased!"));
  },

  init() {
    this.lib = window.EcertDocsLib;
    this.inputFile = document.querySelector("#inputFile");
    this.btnSelecionar = document.querySelector("#btnSelecionar");
    this.btnAddParticipant = document.querySelector("#btnAddParticipant");
    this.updateParticipant = document.querySelector("#updateParticipant");
    this.removeParticipant = document.querySelector("#removeParticipant");
    this.showAllParticipants = document.querySelector("#showAllParticipants");
    this.removeData = document.querySelector("#removeData");
    this.formParticipant = document.querySelector(".form-participant");
    this.btnAdicionarParticipant = document.querySelector("#btnAdicionarParticipant");
    this.tableParticipants = document.querySelector("#tableParticipants");

    this.inputFile.addEventListener("click", function () {
      this.value = "";
    });
    this.inputFile.addEventListener("change", (e) => this.addDocument(e.target.files[0]));
    this.btnSelecionar.addEventListener("click", () => this.inputFile.click());
    this.btnAddParticipant.addEventListener("click", () => this.addParticipant());
    this.updateParticipant.addEventListener("click", () => this.updateParticipantSignaturePos("537.871.660-84"));
    this.removeParticipant.addEventListener("click", () => this.removeParticipantSignature("537.871.660-84"));
    this.showAllParticipants.addEventListener("click", () => this.getParticipants());
    this.removeData.addEventListener("click", () => this.eraseData());
    this.btnAdicionarParticipant.addEventListener("click", () => this.addParticipant());
  },
};
window.addEventListener("load", () => testLib.init());
