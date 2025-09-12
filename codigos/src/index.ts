// Model: Nosso modelo será uma classe simples que representa uma tarefa com um ID, uma descrição e um booleano para verificar se a tarefa foi concluída.
class TarefaModel {
    id: number;
    descricao: string;
    concluida: boolean;
    constructor(id: number, descricao: string, concluida: boolean = false) {
        this.id = id;
        this.descricao = descricao;
        this.concluida = concluida;
    }
}

// View: A visualização será responsável pela interface do usuário, neste caso, o console registrando as tarefas.
class TarefaView {
    mostrar(tarefas: TarefaModel[]) {
        for (const tarefa of tarefas) {
            console.log(`${tarefa.id}: ${tarefa.descricao} - ${tarefa.concluida ? 'Concluída' : 'Pendente'}`);
        }
    }
}

// Controller: O controlador gerenciará a entrada do usuário, atualizando o modelo e a visualização conforme necessário.
class TarefaController {
    private modelo: TarefaModel[];
    private visao: TarefaView;
    constructor(modelo: TarefaModel[], visao: TarefaView) {
        this.modelo = modelo;
        this.visao = visao;
    }
    addTarefa(descricao: string) {
        const novaTarefa = new TarefaModel(this.modelo.length + 1, descricao);
        this.modelo.push(novaTarefa);
        this.visao.mostrar(this.modelo);
    }
    completaTask(id: number) {
        const tarefa = this.modelo.find(tarefa => tarefa.id === id);
        if (tarefa) {
            tarefa.concluida = true;
        }
        this.visao.mostrar(this.modelo);
    }
}
const tarefas: TarefaModel[] = [];
const tarefav = new TarefaView();
const tarefac = new TarefaController(tarefas, tarefav);
tarefac.addTarefa("Fazer algo");
console.log("-----------------------");
tarefac.addTarefa("Fazer outra coisa");
console.log("-----------------------");
tarefac.addTarefa("Fazer mais alguma coisa");
console.log("-----------------------");
tarefac.completaTask(1);