/**
 * Define own data strucutre. Data description in deniksracu.cz/form
 */
export class Toilet {
    constructor(latitude, longtitude, placeName, isClean, hasPaper, canLock, hasWater, isFree, bonusCategory, comment, nicName) {

        this.location.coord.latitude = latitude;
        this.location.coord.longtitude = longtitude;
        this.location.placeName = placeName;

        this.category.isClean = isClean;
        this.category.hasPaper = hasPaper;
        this.category.canLock = canLock;
        this.category.hasWater = hasWater;
        this.category.isFree = isFree;
        this.category.bonusCategory = bonusCategory;
        this.category.comment = comment;

        this.srac.nicName = nicName;

        this.meta.timeStamp = new Date();
    }
}