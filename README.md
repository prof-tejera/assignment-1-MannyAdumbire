# Assignment 1

## Objective

For Assignment 1 (A1) we are going to be building a component libary that we can use for future assignments. Our main goal is to layout the components that will be composed together to create our final bigger components. We will focus on composition, component interfaces, and styling. We aren't going to focus on functionality quite yet and at first our components will be very static.

## What are we building?

In the fitness world, there are lots of different ways a workout can be timed. For example, we can use a traditional stopwatch, a count-down timer, an interval timer, etc. To support our athletes, we’ll be building 4 different types of timers:

| Timer type | Description                                                                                                                                                                                                                                                                               |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stopwatch  | A timer that counts up to X amount of time (e.g. count up to 2 minutes and 30 seconds, starting at 0)                                                                                                                                                                                     |
| Countdown  | A timer that counts down from X amount of time (e.g. count down to 0, starting at 2 minutes and 30)                                                                                                                                                                                       |
| XY         | A timer that counts down from X time per round, for Y number of rounds (e.g. 1 minute for 10 minutes would count down from 1 minute to 0, then start another countdown, etc, 10 times )                                                                                                   |
| TABATA     | An interval timer with work/rest periods. Example: 20s/10s, 8 rounds, would count down from 20 seconds to 0, then count down from 10 seconds to 0, then from 20, then from 10, etc, for 8 rounds. A full round includes both the work and rest. In this case, 20+10=30 seconds per round. |

Our larger components are going to be `Stopwatch`, `Countdown`, `XY`, and `TABATA` (all of them are located in `src/components/timers`), but you can imagine that they have common functionality. An example is a start button. All timers are going to have to have a way to start. Our goal is to take these large components and extract common functionality into smaller components. We might have a `Button` component that is shared by all of our timers and it might have a prop that we pass in that changes the background color in order to create a start `Button` and a stop `Button`.

## Deliverable

1. Create generic components that are going to be used by your timers. The most basic ones, but not limited to, are going to be a `Button`, `Input`, `DisplayTime`, `DisplayRounds`, and `Panel` (that handles layout of your timer).
2. Assemble your timers using the generic component library you have created. All timers should render at `localhost:3000`.
3. Style your components in a way that they are consistent and look presentable. Do not use an existing UI design library (e.g. Google's Material UI or Antd), instead try to come up with your own. **You are welcome to search the internet for design inspiration, but make sure to cite all resources you have used.**
4. Document all of the generic components you have created. In order to do this navigate to `src/view/Documentation` and add your components 1 by 1 with documentation of all props. We have provided an example loading spinner that you can follow.
5. Deploy your application using any method you like (we will provide instructions for GH actions): **URL_TO_APP**

### Deployment Instructions (GH actions)

- Go to `Settings`
- Go to `Pages`
- in `Source`, select `gh-pages` branch
- Click Save
- In `package.json`, add a new key/value as: `"homepage": "https://prof-tejera.github.io/<YOUR REPO NAME GOES HERE>"`

Once the `build-deploy` action finishes running, the app should be live
at `https://prof-tejera.github.io/<YOUR REPO NAME GOES HERE>`

For other ways to deploy see https://github.com/prof-tejera/react-deployment-code

## Grading rubric

- All components are styled using the same method, with the exception of the components we created (e.g. views, App). We have used `styled-components`, but you don't have to.
- UI is consistent and effort has been put into making it look nice. Cite any resources you used.
- All generic components that you have created have been added `docs` and the PropType interfaces have been defined in each of component files.
- Assemble all timers and render them. They for the most part should be static and not functional.
- Keep your code as DRY (Don't repeat yourself) as possible

## Install and Run Project

Install project

```
npm i
```

Run project

```
npm start
```

Assembled timers: `localhost:3000`. Documentation: `localhost:3000/docs`
