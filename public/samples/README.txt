Put your audio samples in this folder.
For example, if you add "kick.wav" here, you can load it in src/patches.js like this:

samples({
  'my-kick': 'samples/kick.wav'
})

Then use it in your code:
s("my-kick")
