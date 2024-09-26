"use strict";
class Polygon {
    _coords;
    constructor(coords) {
        if (coords.length < 3) {
            throw new Error("Багатокутник має містити мінімум 3 сторони");
        }
        if (this.arePointsCollinear(coords)) {
            throw new Error("Точки є колінеарними і не утворюють дійсного багатокутника.");
        }
        this._coords = coords;
    }
    arePointsCollinear(coords) {
        const [x1, y1] = coords[0];
        const [x2, y2] = coords[1];
        for (let i = 2; i < coords.length; i++) {
            const [x3, y3] = coords[i];
            const area = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
            if (area !== 0) {
                return false;
            }
        }
        return true;
    }
    get coords() {
        return this._coords;
    }
    set coords(newCoords) {
        if (newCoords.length < 3) {
            throw new Error("Багатокутник має містити мінімум 3 сторони");
        }
        if (this.arePointsCollinear(newCoords)) {
            throw new Error("Точки є колінеарними і не утворюють дійсного багатокутника.");
        }
        this._coords = newCoords;
    }
    calculatePerimetr() {
        let perimeter = 0;
        const coords = this._coords;
        for (let i = 0; i < coords.length; i++) {
            const [x1, y1] = coords[i];
            const [x2, y2] = coords[(i + 1) % coords.length];
            perimeter += Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        }
        return perimeter;
    }
    calculateArea() {
        let area = 0;
        const coords = this._coords;
        for (let i = 0; i < coords.length; i++) {
            const [x1, y1] = coords[i];
            const [x2, y2] = coords[(i + 1) % coords.length];
            area += x1 * y2 - y1 * x2;
        }
        return Math.abs(area) / 2;
    }
    drawPolygon(color = "red") {
        const svgNamespace = "http://www.w3.org/2000/svg";
        const svg = document.querySelector(".polygonCanvas");
        if (!svg) {
            throw new Error("SVG не існує");
        }
        const polygon = document.createElementNS(svgNamespace, "polygon");
        const points = this._coords.map(coord => coord.join(",")).join(" ");
        polygon.setAttribute("points", points);
        polygon.setAttribute("fill", "none");
        polygon.setAttribute("stroke", color);
        polygon.setAttribute("stroke-width", "2");
        svg.appendChild(polygon);
    }
}
const polygon1 = new Polygon([[1, 2], [4, 5], [7, 2]]);
console.log(polygon1.coords);
polygon1.coords = [[0, 200], [122, 500], [400, 400], [900, 500]];
console.log(polygon1.coords);
console.log(polygon1.coords[1]);
polygon1.coords[1] = [100, 500];
console.log(polygon1.coords[1]);
console.group("Периметр та площа першої фігури");
console.log(polygon1.calculatePerimetr());
console.log(polygon1.calculateArea());
console.groupEnd();
polygon1.drawPolygon();
const polygon2 = new Polygon([[0, 0], [100, 0], [100, 100], [0, 100]]);
console.group("Периметр та площа квадрата зі стороною 100");
console.log(polygon2.calculatePerimetr());
console.log(polygon2.calculateArea());
console.groupEnd();
polygon2.drawPolygon("blue");
//# sourceMappingURL=script.js.map