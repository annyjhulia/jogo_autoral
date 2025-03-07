export class WelcomeScene extends Phaser.Scene {

    //define as dimensões do jogo
    alturaJogo = 600;
    larguraJogo = 800;

    constructor() {
        //nome da cena
        super("WelcomeScene");
    }

    preload() {
        //carrega as imagens que serão utilizadas
        this.load.image("paisagem", "../assets/background.png");
        this.load.image("fundoInicio", "../assets/fundoInicio.png");
        this.load.image("twi", "../assets/twi.png");
        this.load.image("descricao", "../assets/decricao.png");
        this.load.image("titulo", "../assets/twi_quest.png");
        this.load.image("play", "../assets/botao_play.png");

        //carrega os elementos que a personagem buscará
        this.load.image("magic", "../assets/magic.png");
        this.load.image("laughter", "../assets/laughter.png");
        this.load.image("kindness", "../assets/kindness.png");
        this.load.image("loyalty", "../assets/loyalty.png");
        this.load.image("honesty", "../assets/honesty.png");
        this.load.image("generosity", "../assets/generosity.png");
    }

    create() {
        //adiciona o fundo da tela inciial
        this.add.image(this.larguraJogo/1.5, this.alturaJogo/2, "fundoInicio").setScale(0.2);
        //adiciona a imagem com o título
        this.add.image(this.larguraJogo/2, 130, "titulo").setScale(0.9);
        //adiciona imagem da personagem
        this.add.image(this.larguraJogo/2, 270, "twi").setScale(0.3);
        //adiciona o botão de início e interação
        this.botaoJogar = this.add.image(this.larguraJogo/2, 420, "play").setScale(0.4).setInteractive();

        //altera o cursor quando o mouse passa no botão
        this.botaoJogar.on("pointerover", () => {
            this.input.setDefaultCursor("pointer");
        });

        //volta o cursor quando o mouse sai do botão
        this.botaoJogar.on("pointerout", () => {
            this.input.setDefaultCursor("default");
        });

        //inicia a cena do jogo ao clicar o botão de início
        this.botaoJogar.on("pointerdown", () => {
            this.scene.start("MainScene")
        })
    }

    update() {

    }
}