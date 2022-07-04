#### Toy Robot

## Description

The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5x5. Having a CLI option and also a web version.

There are no other obstructions on the table surface.

The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.

> To help me develop this web page, I preferred make the following prototype:
> https://www.figma.com/file/ifToLpmlPlkPMOhMb8X5JA/Toy-robot?node-id=0%3A1

## How to run

### CLI
```sh
cd cli-robot/
npm i
ts-node cli.service.ts
```

### WEB
```sh
cd web-robot/
npm i
npm start
```

## Test Data

In main paste, there is a file with cases and their expected output to help on tests.
