import React, { useState } from 'react';
import '../style/schedule.css';

export const DoubleSquare = () => {

    return (
        <div class="content">
            <div class="top-input">
                <div class="group">
                    <input class="name" type="text" id="unit[pos1]u" /><input class="name" type="text" id="name[pos1]u" /><br></br>
                    <input class="name" type="text" id="unit[pos1]d" /><input class="name" type="text" id="name[pos1]d" />
                </div>
                <div class="separater"></div>
                <div class="group">
                    <input class="name" type="text" id="unit[pos2]u" /><input class="name" type="text" id="name[pos2]u" /><br></br>
                    <input class="name" type="text" id="unit[pos2]d" /><input class="name" type="text" id="name[pos2]d" />
                </div>
            </div>
            <div class="square-block">
                <div class="label">[label]</div>
                <div class="_121"><input class="score" type="text" id="[game1]_above" /></div>
                <div class="_122"><input class="score" type="text" id="[game1]_below" /></div>
                <div class="_131"><input class="score" type="text" id="[game3]_above" /></div>
                <div class="_141"><input class="score" type="text" id="[game5]_above" /></div>
                <div class="_232"><input class="score" type="text" id="[game6]_above" /></div>
                <div class="_242"><input class="score" type="text" id="[game4]_above" /></div>
                <div class="_133"><input class="score" type="text" id="[game3]_below" /></div>
                <div class="_233"><input class="score" type="text" id="[game6]_below" /></div>
                <div class="_144"><input class="score" type="text" id="[game5]_below" /></div>
                <div class="_244"><input class="score" type="text" id="[game4]_below" /></div>
                <div class="_343"><input class="score" type="text" id="[game2]_above" /></div>
                <div class="_344"><input class="score" type="text" id="[game2]_below" /></div>
                <div class="square-game1">[game1]</div><div class="square-game2">[game2]</div><div class="square-game3">[game3]</div>
                <div class="square-game4">[game4]</div><div class="square-game5">[game5]</div><div class="square-game6">[game6]</div>
                <div class="square"></div>
            </div>
            <div class="down-input">
                <div class="group">
                    <input class="name" type="text" id="unit[pos3]u" /><input class="name" type="text" id="name[pos3]u" /><br></br>
                    <input class="name" type="text" id="unit[pos3]d" /><input class="name" type="text" id="name[pos3]d" />
                </div>
                <div class="separater"></div>
                <div class="group">
                    <input class="name" type="text" id="unit[pos4]u"/><input class="name" type="text" id="name[pos4]u"/><br></br>
                    <input class="name" type="text" id="unit[pos4]d"/><input class="name" type="text" id="name[pos4]d"/>
                </div>
            </div>
        </div>
    )
}

export const SingleSquare = () => {

    return (
        <div class="content">
            <div class="top-input">
                <div class="group">
                    <input class="name" type="text" id="unit[pos1]u" /><input class="name" type="text" id="name[pos1]u" /><br></br>
                    <input class="name" type="text" id="unit[pos1]d" /><input class="name" type="text" id="name[pos1]d" />
                </div>
                <div class="separater"></div>
                <div class="group">
                    <input class="name" type="text" id="unit[pos2]u" /><input class="name" type="text" id="name[pos2]u" /><br></br>
                    <input class="name" type="text" id="unit[pos2]d" /><input class="name" type="text" id="name[pos2]d" />
                </div>
            </div>
            <div class="square-block">
                <div class="label">[label]</div>
                <div class="_121"><input class="score" type="text" id="[game1]_above" /></div>
                <div class="_122"><input class="score" type="text" id="[game1]_below" /></div>
                <div class="_131"><input class="score" type="text" id="[game3]_above" /></div>
                <div class="_141"><input class="score" type="text" id="[game5]_above" /></div>
                <div class="_232"><input class="score" type="text" id="[game6]_above" /></div>
                <div class="_242"><input class="score" type="text" id="[game4]_above" /></div>
                <div class="_133"><input class="score" type="text" id="[game3]_below" /></div>
                <div class="_233"><input class="score" type="text" id="[game6]_below" /></div>
                <div class="_144"><input class="score" type="text" id="[game5]_below" /></div>
                <div class="_244"><input class="score" type="text" id="[game4]_below" /></div>
                <div class="_343"><input class="score" type="text" id="[game2]_above" /></div>
                <div class="_344"><input class="score" type="text" id="[game2]_below" /></div>
                <div class="square-game1">[game1]</div><div class="square-game2">[game2]</div><div class="square-game3">[game3]</div>
                <div class="square-game4">[game4]</div><div class="square-game5">[game5]</div><div class="square-game6">[game6]</div>
                <div class="square"></div>
            </div>
            <div class="down-input">
                <div class="group">
                    <input class="name" type="text" id="unit[pos3]u" /><input class="name" type="text" id="name[pos3]u" /><br></br>
                    <input class="name" type="text" id="unit[pos3]d" /><input class="name" type="text" id="name[pos3]d" />
                </div>
                <div class="separater"></div>
                <div class="group">
                    <input class="name" type="text" id="unit[pos4]u"/><input class="name" type="text" id="name[pos4]u"/><br></br>
                    <input class="name" type="text" id="unit[pos4]d"/><input class="name" type="text" id="name[pos4]d"/>
                </div>
            </div>
        </div>
    )
}

