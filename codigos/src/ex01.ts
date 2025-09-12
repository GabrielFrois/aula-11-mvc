class Pessoa {
    private _nome:string;
    private _idade:number;

    public constructor (nome:string, idade:number){
        this._nome = nome;
        this._idade = idade;
    }

    get nome():string{
        return this._nome;
    }

    get idade():number{
        return this._idade;
    }
}

class ClienteModel extends Pessoa {
    private _id:number;
    private _status:boolean;

    public constructor(id:number, nome:string, idade:number, status:boolean){
        super(nome,idade);
        this._id = id;
        this._status = status;
    }

    get id():number{
        return this._id;
    }

    get status():boolean{
        return this._status;
    }

    set status(novoStatus:boolean){
        this._status = novoStatus;
    }
}

class ClienteView {
    public exibirClientes(clientes: ClienteModel[]): void {
        console.log("-- Lista de Clientes Cadastrados --");
        if (clientes.length === 0) {
            console.log("Nenhum cliente cadastrado");
        } else {
            clientes.forEach(cliente => {
                const statusTexto = cliente.status ? 'Ativo' : 'Inativo';
                console.log(
                    `ID: ${cliente.id} - Nome: ${cliente.nome} - Idade: ${cliente.idade} - Status: ${statusTexto}`
                );
            });
        }
        console.log("------------------\n");
    }
}

class ClienteController{
    private clientes:ClienteModel[];
    private view:ClienteView;
    private proximoId:number;

    public constructor(clientes:ClienteModel[], view:ClienteView){
        this.clientes = clientes;
        this.view = view;
        this.proximoId = 1;
    }

    public adicionarCliente(nome:string, idade:number): void{
        console.log(`- Adicionando cliente: ${nome} -`);

        const novoCliente = new ClienteModel(this.proximoId, nome, idade, true);
        
        this.clientes.push(novoCliente);
        this.proximoId++;

        this.view.exibirClientes(this.clientes);
    }

    public alterarStatusCliente(id:number, novoStatus:boolean):void {
        console.log(`- Alterando status do cliente com ID ${id} para ${novoStatus ? 'Ativo' : 'Inativo'} -`);
        const cliente = this.clientes.find(c => c.id === id);

        if (cliente){
            cliente.status = novoStatus;
        } else {
            console.log(`Erro: Cliente com ID ${id} não encontrado`);
        }
        this.view.exibirClientes(this.clientes);
    }
}

const listaDeClientes: ClienteModel[] = [];
const clienteView = new ClienteView();

const clienteController = new ClienteController(listaDeClientes, clienteView);

clienteController.adicionarCliente("José", 30);
clienteController.adicionarCliente("Maria", 25);
clienteController.adicionarCliente("Antônio", 42);

clienteController.alterarStatusCliente(2, false); 