/* eslint-disable function-paren-newline */

import {
  extendObservable,
  computed,
} from 'mobx';
import uniqBy from 'lodash.uniqby';

import { getData } from './helpers';

class Store {
  constructor() {
    extendObservable(this, {
      tags: [],
      startDate: -Infinity,
      endDate: +Infinity,
      bounds: {
        minLat: -180,
        maxLat: 180,
        minLng: -180,
        maxLng: 180,
      },
      selectedTag: null,
    });
  }

  async fetchTags() {
    const { tags } = await getData();

    this.setTags(tags);
  }

  get tagsInRange() {
    const startTimestamp = +this.startDate;
    const endTimestamp = +this.endDate;

    // TODO this could just assume sorting and use filtering or `for`
    return computed(
      () => {
        const tagsInRange = this.tags.reduce((list, tag) => {
          const { timestamp } = tag;
          const isInTimeRange = timestamp >= startTimestamp && timestamp < endTimestamp;
          let isInRange;

          if (!this.bounds) {
            isInRange = isInTimeRange;
          } else if (tag.geolocation) {
            const {
              longitude,
              latitude,
            } = tag.geolocation;
            const {
              minLat,
              maxLat,
              minLng,
              maxLng,
            } = this.bounds;

            const isInRegion = longitude > minLng && longitude < maxLng
                            && latitude > minLat && latitude < maxLat;

            isInRange = isInTimeRange && isInRegion;
          } else {
            // there are bounds, but the track has no geolocation info. not in range.
            isInRange = false;
          }

          return list.concat(isInRange ? tag : []);
        }, []);

        return uniqBy(tagsInRange, 'key');
      } // eslint-disable-line comma-dangle
    );
  }

  setBounds(bounds) {
    this.bounds = bounds;
  }

  setSelectedTag(tagId) {
    this.selectedTag = this.tags.find(({ tagid }) => tagid === tagId);
  }

  setDateRange(startDate, endDate) {
    Object.assign(this, { startDate, endDate });
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  setTags(tags) {
    this.tags = tags.reverse();

    const timestamps = tags.map(({ timestamp }) => timestamp);
    Object.assign(this, {
      startDate: new Date(Math.min.apply(null, timestamps)),
      endDate: new Date(Math.max.apply(null, timestamps)),
    });
  }

  getDateRange() {
    return [this.startDate, this.endDate];
  }

  findTagById(tagId) {
    return this.tags.find(({ tagid }) => tagid === tagId);
  }
}

export default new Store();
