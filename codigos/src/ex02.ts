class AgendaModel {
    public contatos:Contato[]
    private proximoId:number;

    constructor(){
        this.contatos = [];
        this.proximoId = 1;
    }

    public obterProximoId():number{
        return this.proximoId++;
    }
}

class Contato {
    public id:number;
    public nome:string;
    public telefone:string;
    public email:string;
    public ativo:boolean;
    
    constructor(id:number, nome:string, telefone:string, email:string){
        this.id = id;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.ativo = true;
    }
}

class AgendaView {
    public listarContatos(contatos:Contato[]): void {
        console.log("\nLista de Contatos");
        if(contatos.length === 0){
            console.log("Nenhum contato cadastrado");
            return;
        }

        contatos.forEach(contato => {
            const status = contato.ativo ? 'Ativo' : 'Desativado';
            console.log(`ID: ${contato.id} - Nome: ${contato.nome} - Telefone: ${contato.telefone} - E-mail: ${contato.email} - Status: ${status}`);
        });
    }
}

class AgendaController {
    private model:AgendaModel;
    private view:AgendaView;

    constructor(model:AgendaModel, view:AgendaView){
        this.model = model;
        this.view = view;
    }

    public adicionarContato(nome:string, telefone:string, email:string):void{
        console.log(`Adicionando contato: ${nome}`);
        const id = this.model.obterProximoId();
        const novoContato = new Contato(id, nome, telefone, email);
        this.model.contatos.push(novoContato);

        //Lista todos os contatos
        this.view.listarContatos(this.model.contatos);
    }

    public setarStatus(contatoId:number, novoStatus:boolean):void{
        console.log(`Alterando status do contato ID ${contatoId}`);
        const contato = this.model.contatos.find(c => c.id === contatoId);

        if (contato){
            contato.ativo = novoStatus;
        } else {
            console.log(`Erro: Contato com ID ${contatoId} não encontrado`)
        }

        // Aciona View para listar os contatos
        this.view.listarContatos(this.model.contatos);
    }
}

const agendaModel = new AgendaModel();
const agendaView = new AgendaView();
const agendaController = new AgendaController(agendaModel, agendaView);

agendaView.listarContatos(agendaModel.contatos);

agendaController.adicionarContato("Ana Silva", "11-98765-4321", "ana.silva@email.com");
agendaController.adicionarContato("Bruno Costa", "21-91234-5678", "bruno.costa@email.com");
agendaController.adicionarContato("Carlos Souza", "31-95555-4444", "carlos.souza@email.com");

agendaController.setarStatus(2, false);
agendaController.setarStatus(1, false);
agendaController.setarStatus(1, true);
