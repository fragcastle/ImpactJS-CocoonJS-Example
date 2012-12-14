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
    // Load a font
    font: new ig.Font('media/04b03.14.black.font.png'),
    buttonImage: new ig.Image('media/mobile-buttons.png'),
    jumpSfx: new ig.Sound('media/sounds/jump.mp3'),
    clearColor: "#FFFFFF",

    buttons: [],

    init: function() {
      this.bindInput();
    },

    bindInput: function() {
      // General input
      ig.input.bind( ig.KEY.ESC, 'esc' );

      // player actions
      ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
      ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
      ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
      ig.input.bind( ig.KEY.X, 'jump' );
      ig.input.bind( ig.KEY.C, 'shoot' );
      ig.input.bind( ig.KEY.TAB, 'switch' );
      ig.input.bind( ig.KEY.Z, 'crouch' );

      // For Mobile Browsers and Ejecta
      var buttonSize = 96;

      this.buttons = [
        new ig.TouchButton( 'esc', ig.system.width / 2 - buttonSize / 2, 0, 80, buttonSize, this.buttonImage, 2 ),
        new ig.TouchButton( 'left', 0, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 0 ),
        new ig.TouchButton( 'right', buttonSize, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 1 ),
        new ig.TouchButton( 'jump', ig.system.width - buttonSize * 2, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 3 ),
        new ig.TouchButton( 'shoot', ig.system.width - buttonSize, ig.system.height - buttonSize, 80, buttonSize, this.buttonImage, 2 ),
        new ig.TouchButton( 'switch', ig.system.width - buttonSize, 0, 80, buttonSize, this.buttonImage, 2 )
      ];
    },

    loadLevel: function( level ) {
      this.parent( level );
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

      this.font.draw('It works!', x, y, ig.Font.ALIGN.CENTER);

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
