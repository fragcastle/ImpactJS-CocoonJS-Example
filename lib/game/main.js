ig.module(
  'game.main'
)
.requires(
  'plugins.touch-button',

  'impact.game',
  'impact.font',

  'plugins.font'
)
.defines(function() {
  MyGame = ig.Game.extend({
    // Make sure all assets are preloaded

    // ImpactJS font
    font: new ig.Font('media/04b03.14.black.font.png'),

    buttonImage: new ig.Image('media/mobile-buttons.png'),

    jumpSfx: new ig.Sound('media/sounds/jump.*'),

    // Make sure the music is loaded by the preloader.
    // Passing 'false' as the second argument, prevents loading this
    // sound as multi channel.
    backgroundMusic: new ig.Sound('media/sounds/Were-The-Resistors.*', false ),

    // Clear to white before drawing each frame (default is black)
    clearColor: 'rgb(255, 255, 255)',

    buttons: [],

    inputDelayTimer: null,

    init: function() {
      // Default settings: 20px Garamond
      // this.fontPluginFont = new Font();
      this.fontPluginFont = new Font('20px 04B_03_');

      this.bindInput();

      // Prevents spamming of input
      this.inputDelayTimer = new ig.Timer();

      ig.music.add(this.backgroundMusic);

      ig.music.volume = 0.5;
      ig.music.play();
    },

    bindInput: function() {
      // Keyboard controls
      ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
      ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
      ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
      ig.input.bind( ig.KEY.X, 'jump' );
      ig.input.bind( ig.KEY.C, 'shoot' );

      // Touch controls for Mobile Browsers and CocoonJS
      var buttonHeight = 96;
      var buttonWidth = 80;

      this.buttons = [
        new ig.TouchButton( 'left', 0, ig.system.height - buttonHeight, buttonWidth, buttonHeight, this.buttonImage, 0 ),
        new ig.TouchButton( 'right', buttonWidth, ig.system.height - buttonHeight, buttonWidth, buttonHeight, this.buttonImage, 1 ),
        new ig.TouchButton( 'jump', ig.system.width - buttonWidth * 2, ig.system.height - buttonHeight, buttonWidth, buttonHeight, this.buttonImage, 3 ),
        new ig.TouchButton( 'shoot', ig.system.width - buttonWidth, ig.system.height - buttonHeight, buttonWidth, buttonHeight, this.buttonImage, 2 ),
      ];
    },

    update: function() {
      this.parent();

      if(this.inputDelayTimer.delta() > 0) {
        if (ig.input.state('jump')) {
          this.jumpSfx.play();
          this.inputDelayTimer.set(0.5);
        }
      }
    },

    draw: function() {
      this.parent();

      var x = ig.system.width / 2,
          y = ig.system.height / 2;

      this.fontPluginFont.draw('Music from Eric Skiff', 5, 5, 'left', '#000000');
      this.fontPluginFont.draw('http://ericskiff.com/music/', 5, 25, 'left', '#000000');

      this.fontPluginFont.draw('Native left aligned', x, y - 60, 'left', '#000000');
      this.fontPluginFont.draw('Native center aligned', x, y - 40, 'center', '#000000');
      this.fontPluginFont.draw('Native right aligned', x, y - 20, 'right', '#000000');

      // Font sprite currently has rendering issues with CocoonJS
      this.font.draw('ImpactJS left aligned', x, y, ig.Font.ALIGN.LEFT);
      this.font.draw('ImpactJS center aligned', x, y + 20, ig.Font.ALIGN.CENTER);
      this.font.draw('ImpactJS right aligned', x, y + 40, ig.Font.ALIGN.RIGHT);

      ig.system.context.globalAlpha = 0.3;

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
