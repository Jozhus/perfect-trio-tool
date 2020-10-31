import React from "react";

class About extends React.Component {
    render() {
        return (
            <div style={{ padding: "15px" }}>
                <br />
                <h3>What is this?</h3>
                <hr />
                <p>
                    This is a tool for identifying perfect trio boost node pairs or groups in Maplestory.
                </p>
                <p>
                    The V-Matrix is unlocked after completing the 5th job allowing you open nodestones for nodes
                    that give new skills or nodes which boosts the damage of previously existing skills.
                </p>
                <br />
                <h3>Why does this exist?</h3>
                <hr />
                <p>
                    The effects from boost nodes are a significant portion of your damage, so it is important to get as much as you can from them.
                </p>
                <p>
                    However, there are a few restrictions that make maximizing boost node gains difficult:
                </p>
                <ul>
                    <li>Unless you're higher leveled, you are limited on node slots.</li>
                    <li>Skills boosted by nodes are randomized when opening nodestones.</li>
                    <li>A node can have a max level of 25, but a total boost to a skill can be stacked up to 50 (60 if you count node slot upgrades).</li>
                    <li>You can only equip 1 boost node per left-most skill (i.e. A node that has skills A, B, C shares a left-most skill with a node that has skills A, D, E and therefore cannot be equipped together)</li>
                </ul>
                <p>We get around these restrictions by equipping multiple unique boost nodes and making sure each skill gets a total boost of 50 as a result.</p>
                <p>The main challenge is finding a grouping of boost nodes that can actually accomplish this and do so efficiently.</p>
                <p>That's where this tool comes in. You insert all your boost nodes, chooses which skills you need and it will identify all (given enough time) node grouping options letting you pick and choose which one to use.</p>
                <br />
                <h3>Changelog</h3>
                <hr />
                <p>
                    10/31/2020 - Version 1.4
                </p>
                <ul>
                    <li>Added some colors for differing class types and job groups to make it a little easier to find a specific class in a list.</li>
                    <li>It might look a bit ugly, but refer the the resources tab for reference</li>
                </ul>
                <p>
                    10/30/2020 - Version 1.3.1
                </p>
                <ul>
                    <li>Hero's perfect trio skills were one-off. I literally had Slash Blast as its most important skill lmao.</li>
                </ul>
                <p>
                    10/30/2020 - Version 1.3
                </p>
                <ul>
                    <li>Changed the skill display for creating nodes into a grid instead of a scrolling list.</li>
                    <li>Deleting a node now un-highlights nodes that were in a selected group from the generated list.</li>
                    <li>Added content to the resources tab so it's not empty</li>
                    <li>More CSS bullshittery.</li>
                </ul>
                <p>
                    10/29/2020 - Version 1.2
                </p>
                <ul>
                    <li>Fixed the algorithm because it wasn't fully working correctly.</li>
                    <li>Flipped this changelog so that versions are in descending order.</li>
                </ul>
                <p>
                    10/29/2020 - Version 1.1
                </p>
                <ul>
                    <li>Fixed a few crashing bugs.</li>
                    <li>Made skill text non-selectable.</li>
                    <li>Changed mouse hover icons for certain components.</li>
                    <li>Added / modified some info texts.</li>
                </ul>
                <p>
                    10/29/2020 - Version 1.0
                </p>
                <ul>
                    <li>Gave this brute-forcing algorithm a GUI.</li>
                </ul>
            </div>
        );
    }
}

export { About };