declare namespace DxfParser {
    export interface Point {
        x: number;
        y: number;
        z?: number;
    }

    export interface LWPolylineVertices extends Point {
        startWidth?: number;
        endWidth?: number;
        bulge?: boolean;
    }

    export interface Handle {
        handle: string;
        ownerHandle: string;
    }

    export interface EntityBase extends Handle {
        //type: string;

        lineType?: string;
        layer: string;
        lineTypeScale?: string;
        visible?: boolean;

        colorIndex?: number;
        color?: number;

        inPaperSpace?: boolean;
        materialObjectHandle?: string;

        lineweight: number;
    }

    export interface Vertex extends EntityBase, Point {
        x: number;
        y: number;
        z?: number;

        curveFittingVertex?: boolean;
        curveFitTangent?: boolean;
        splineVertex?: boolean;
        splineControlPoint?: boolean;
        threeDPolylineVertex?: boolean;
        threeDPolylineMesh?: boolean;
        polyfaceMeshVertex?: boolean;
    }

    export interface LWPOLYLINE extends EntityBase {
        type: "LWPOLYLINE";

        elevation?: number;
        depth?: number;

        shape?: boolean;

        numberOfVertices?: number;

        vertices: LWPolylineVertices[];
    }

    export interface POLYLINE extends EntityBase {
        type: "POLYLINE";

        thickness?: number;

        //from flags
        shape?: boolean;
        includesCurveFitVertices?: boolean;
        includesSplineFitVertices?: boolean;
        is3dPolyline?: boolean;
        is3dPolygonMesh?: boolean;
        is3dPolygonMeshClosed?: boolean;
        isPolyfaceMesh?: boolean;
        hasContinuousLinetypePattern?: boolean;

        extrusionDirection?: Point;

        vertices: Vertex[];
    }

    export interface LINE extends EntityBase {
        type: "LINE";

        vertices: Point[];

        extrusionDirection?: Point;
    }

    export interface CIRCLE extends EntityBase {
        type: "CIRCLE" | "ARC";

        center: Point;
        radius: number;

        startAngle?: number;
        endAngle?: number;
        angleLength?: number;
    }

    export interface TEXT extends EntityBase {
        type: "TEXT";

        startPoint: Point;
        endPoint?: Point;
        textHeight?: number;
        xScale?: number;
        /**
         * Rotation in degrees
         */
        rotation?: number;
        text: string;
        halign: string;
        valign: string;
    }

    export interface MTEXT extends EntityBase {
        type: "MTEXT";

        text: string;
        textStyle: string;
        position: Point;
        xAxisDirection: Point;
        height: number;
        width: number;
        /**
         * Rotation angle in radians
         */
        rotation: number;
        attachmentPoint: number;
        drawingDirection: number;
    }

    export interface ATTDEF extends EntityBase, Point {
        type: "ATTDEF";

        x: number;
        y: number;
        z?: number;

        text: string;
        tag: string;
        prompt: string;

        thickness?: number;
        textHeight?: number;
        rotation?: number;
        obliqueAngle?: number;

        invisible?: boolean;
        constant?: boolean;
        verificationRequired?: boolean;
        preset?: boolean;

        backwards?: boolean;
        mirrored?: boolean;

        horizontalJustification?: number;
        verticalJustification?: number;
        fieldLength?: number;

        extrusionDirectionX?: number;
        extrusionDirectionY?: number;
        extrusionDirectionZ?: number;

        scale: number;
        textStyle: string;
    }

    export interface DIMENSION extends EntityBase {
        type: "DIMENSION";

        block: string;
        anchorPoint: Point;
        middleOfText: Point;
        attachmentPoint: number;
        actualMeasurement: number;
        text?: string;
        angle?: number;
    }

    export interface SOLID extends EntityBase {
        type: "SOLID";

        points: Point[];
        extrusionDirection?: Point;
    }

    export interface INSERT extends EntityBase {
        type: "INSERT";

        /** name of block */
        name: string;
        position: Point;

        xScale?: number;
        yScale?: number;
        zScale?: number;

        rotation?: number;

        columnCount?: number;
        rowCount?: number;
        columnSpacing?: number;
        rowSpacing?: number;

        extrusionDirection?: Point;
    }

    export interface POINT extends EntityBase {
        type: "POINT";

        position: Point;
        thickness?: number;
        extrusionDirection?: Point;
    }

    export type Entity =
        LWPOLYLINE |
        POLYLINE |
        LINE |
        CIRCLE |
        TEXT |
        MTEXT |
        ATTDEF |
        DIMENSION |
        SOLID |
        INSERT |
        POINT;

    export interface Block extends Handle {
        xrefPath: string;
        name: string;
        name2: string;
        layer: string;

        position: Point;
        paperSpace: boolean;

        type: number;

        entities: Entity[];
    }

    export interface Layer {
        name: string;
        flags: number;
        visible: boolean;
        color: number
    }

    export interface DxfDoc {
        blocks: Dict<Block>;
        entities: Entity[];
        tables: {
            layer: {
                layers: Dict<Layer>
            }
        };
    }
}

declare class DxfParser {
    parseSync(source: string): DxfParser.DxfDoc;
}

export = DxfParser;