ig.module(
  'game.main'
)
.requires(
  'plugins.touch-button',

  'impact.game',
  'impact.font'
)
.defines(function() {
  MyGame = ig.Game.extend({
    fontBlack: new ig.Font('media/04b03.14.black.font.png'),
    fontWhite: new ig.Font('media/04b03.14.white.font.png'),

    buttonImage: new ig.Image('media/mobile-buttons.png'),

    jumpSfx: new ig.Sound('media/sounds/jump.*'),

    // Make sure the music is loaded by the preloader.
    // Passing 'false' as the second argument, prevents loading this
    // sound as multi channel.
    backgroundMusic: new ig.Sound('media/sounds/Were-The-Resistors.*', false ),

    buttons: [],

    init: function() {
      this.font = this.fontWhite;

      this.bindInput();

      ig.music.add(this.backgroundMusic);
      
      ig.music.volume = 0.5;
      ig.music.play();
    },

    bindInput: function() {
      // player actions
      ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
      ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
      ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
      ig.input.bind( ig.KEY.X, 'jump' );
      ig.input.bind( ig.KEY.C, 'shoot' );

      // For Mobile Browsers and Ejecta
      var buttonSize = 96;

      this.buttons = [
        new ig.TouchButton( 'left', 0, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 0 ),
        new ig.TouchButton( 'right', buttonSize, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 1 ),
        new ig.TouchButton( 'jump', ig.system.width - buttonSize * 2, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 3 ),
        new ig.TouchButton( 'shoot', ig.system.width - buttonSize, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 2 ),
      ];
    },

    update: function() {
      this.parent();

      if (ig.input.state('jump')) {
        this.jumpSfx.play();
      }
    },

    draw: function() {
      this.parent();

      var x = ig.system.width / 2,
          y = ig.system.height / 2;

      this.font.draw('It works!', x, y - 60, ig.Font.ALIGN.CENTER);
      this.font.draw('Music from Eric Skiff', x, y - 40, ig.Font.ALIGN.CENTER);
      this.font.draw('http://ericskiff.com/music/', x, y - 20, ig.Font.ALIGN.CENTER);

      ig.system.context.globalAlpha = 0.5;

      // Draw all touch buttons - if we have any
      if ( this.buttons ) {
        for( var i = 0; i < this.buttons.length; i++ ) {
          this.buttons[i].draw();
        }
      }

      ig.system.context.globalAlpha = 1;
    }
  });

  var c = document.createElement('canvas');
  c.id = 'canvas';
  document.body.appendChild(c);

  ig.main( '#canvas', MyGame, 60, 480, 300, 2 );
});
