**HOSTED AT** - https://ww6mt.csb.app/

**Code Sandbox** - https://codesandbox.io/s/snake-game-ww6mt

<img src="screenshot.png">

### Learning Resources 

You provide `requestAnimationFrame()` with a function that it needs to run when it decided that the browser is ready. In case of the MDN's example, that function is called `step()`.

So here's how it goes:

The page loads.
`requestAnimationFrame(step)` is invoked.
`requestAnimationFrame()` decides that it's time and fires off step().
`step()` runs and does it's thing.
When `step()` is done with everything it fires off requestAnimationFrame() and passes itself to it.
They continue like this forevermore, invoking each other.

#### `setInterval` vs `setTimeout` vs `requestAnimationFrame`

`setTimeout` and `setInterval` are two functions that let you schedule some code to run at a later time. You tell it how many milliseconds you want to wait, and your function will be called after approximately that many milliseconds have elapsed. The difference between the two is that `setTimeout` will be called back only once, while `setInterval` will be called back repeatedly.

If you just want to do random things after a period of time, then these are generally fine. But if you want to do something which is synchronized with the browser painting, they're not good enough. The most common example of this is if you're animating something, such as trying to set a new position of an element every frame. The browser usually paints every 1/60 of a second, so you might try setting a timeout or interval for 16.7 milliseconds, and calculating the new position then. But due to the inaccuracy of setTimeout and setInterval, plus the fact that you have no way to directly detect long frames, this might result in getting callbacks twice in a single frame, or skipping frames. So your animation ends up doing unnecessary calculations, or having bad framerates, or both.

`requestAnimationFrame` is like `setTimeout`, but instead of asking to have your code be run after a specific amount of time, you ask the browser to call you right when it's about to paint. Roughly speaking that will be in 16.7 milliseconds, but there's no guesswork: the browser knows exactly when it's about to paint, and will call you exactly then, and at no other time.

There's no equivalent of setInterval, so if you need this to happen repeatedly, you just call `requestAnimationFrame` again.

https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

https://css-tricks.com/using-requestanimationframe/

https://www.youtube.com/watch?v=QTcIXok9wNY