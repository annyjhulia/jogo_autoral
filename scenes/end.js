export class EndScene extends Phaser.Scene {

    //define as dimensões do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        //nome da cena
        super("EndScene");
    }

    //inicia a cena de acordo com o resultado do jogo
    init(data) {
        this.resultado = data.resultado;
    }

    preload() {
        //carrega as imagens que serão utilizadas
        this.load.image("paisagem", "./assets/background.png");
        this.load.image("perdeu", "./assets/perdeu.png");
        this.load.image("ganhou", "./assets/ganhou.png");
        this.load.image("menu", "./assets/botao_menu.png");
        this.load.image("restart", "./assets/botao_restart.png");
    }

    create() {
        //adiciona o fundo da tela final
        this.add.image(this.larguraJogo/1.5, this.alturaJogo/2, "fundoInicio").setScale(0.2);
        //adiciona imagem da personagem
        this.add.image(this.larguraJogo/2, 250, "twi").setScale(0.6);
        //adiciona texto da vitória
        this.add.image(this.larguraJogo/2, this.alturaJogo/1.3, "ganhou").setScale(0.6);
    }

    update() {

    }
}