export class GameScene extends Phaser.Scene {
    
    //define as dimensões do jogo
    alturaJogo = 600;
    larguraJogo = 800;
    plataformas = [];
    elementos = [];

    constructor() {
        //nome da cena
        super("MainScene");
    }

    preload() {
        //carrega as imagens que serão utilizadas
        this.load.image("paisagem", "../assets/background.png");
        this.load.image("plataforma", "../assets/plataforma.png");
        this.load.image("plataforma2", "../assets/plataforma2.png");
        this.load.image("twilight", "../assets/twilight.png");
        this.load.image("twilight", "../assets/twilightLado.png");
    }

    create() {

        //o placar inicia com 0 pontos
        this.pontuacao = 0;

        //adiciona o fundo do logo
        this.add.image(this.larguraJogo / 2, this.alturaJogo / 2, "paisagem").setScale(1.3);

        //cria a personagem com movimento
        this.player = this.physics.add.sprite(this.larguraJogo / 2, 100, 'twilight').setScale(0.3);
        this.player.setCollideWorldBounds(true);

        //adição de obstáculos
        this.plataformas[0] = this.physics.add.staticImage(200, 250, 'plataforma');
        this.plataformas[0].body.setSize(148, 44, true);
        this.plataformas[0].setScale(0.1);

        this.plataformas[1] = this.physics.add.staticImage(580, 300, 'plataforma2');
        this.plataformas[1].body.setSize(148, 44, true);
        this.plataformas[1].setScale(0.1);

        //adição de colisão entre a personagem e os obstáculos
        for (let i = 0; i < this.plataformas.length; i++) {
            this.physics.add.collider(this.player, this.plataformas[i]);
        }

        //adiciona as setas do teclado
        this.cursors = this.input.keyboard.createCursorKeys();

        //adiciona o placar na tela
        this.placar = this.add.text(50, 50, 'Pontuacao:' + this.pontuacao, { fontSize: '45px', fill: '#495613' });

        //adiciona os elementos coletáveis
        this.loadElement("magic");
        this.loadElement("laughter");
        this.loadElement("kindness");
        this.loadElement("loyalty");
        this.loadElement("honesty");
        this.loadElement("generosity");

        //torna o elemento magic visível inicialmente
        this.elementos[0].setVisible(true);

    }

    update() {
        //movimento para a esquerda
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            if (this.player.anims.currentAnim?.key !== 'esquerda') {
                this.player.anims.play('esquerda', true);
            }
        } 
        //movimento para a direita
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            if (this.player.anims.currentAnim?.key !== 'direita') {
                this.player.anims.play('direita', true);
            }
        } 
        //momento em que o jogador está parado
        else {
            this.player.setVelocityX(0);
            if (this.player.anims.currentAnim?.key !== 'parada') {
                this.player.anims.play('parada', true);
            }
        }

        //lógica de pulo (vertical) 
        if (this.cursors.up.isDown) { 
            this.player.setVelocityY(-400);
        }

        //acelerar a descida
        if (this.cursors.down.isDown) {
            this.player.setVelocityY(400); // Acelera a descida 
        }

        //condição para a finalização do jogo
        if (this.pontuacao >= 6) {
            this.scene.stop('MainScene');
            this.scene.start('EndScene', "ganhou");
        }

    }

    //configurando a aparição dos diferentes elementos aleatoriamente
    loadElement(name) {
        var element = this.physics.add.sprite(this.larguraJogo / 3, 0, name);
        element.setVisible(false);
        element.setCollideWorldBounds(true); //impede que o elemento saia da tela
        element.setScale(0.3);

        //adiciona colisão do elemento com o obstáculo
        this.physics.add.collider(element, this.plataformas[0]); 
        this.physics.add.collider(element, this.plataformas[1]);

        // quando o player encostar no elemento
        this.physics.add.overlap(this.player, element, () => {
            if (element.visible == false) return
            
            element.setVisible(false); //o elemento fica invisível

            //seleciona um elemento aleatório
            var randomElement = this.elementos[Phaser.Math.RND.between(1, this.elementos.length - 1)] 

            //número sorteado entre 50 e 650
            var posicaoMagic_X = Phaser.Math.RND.between(50, 650);

            //ajusta a posição do elemento de acordo com o número sorteado
            randomElement.setPosition(posicaoMagic_X, 100);

            this.pontuacao += 1; //soma pontuação a cada elemento coletado
            this.placar.setText('Pontuacao: ' + this.pontuacao); //atualiza o placar

            randomElement.setVisible(true); // torna o elemento visível
        });

        //adicionando a função aos elementos na lista
        this.elementos.push(element);
    }
}
