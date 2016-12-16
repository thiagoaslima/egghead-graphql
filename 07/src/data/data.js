const videoA = {
    id: 'A',
    title: 'video A',
    duration: 120,
    watched: true
};

const videoB = {
    id: 'B',
    title: 'video B',
    duration: 160,
    watched: false
};

const videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
});

exports.getVideoById = getVideoById;