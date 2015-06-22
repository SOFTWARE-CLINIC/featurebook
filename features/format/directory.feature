Feature: Directory

  FeatureBook can generate a system specification from a directory containing:

  * Gherkin source files
  * The `assets` directory for images and videos that you can refer to from within the Gherkin source files
  * An optional `SUMMARY.md` descriptor
  * An optional `featurebook.json` descriptor

  ```
  |-- assets
  |   |-- images
  |   |   |-- picture_is_worth_1000_words.png
  |   |   `-- two_pictures_are_worth_2000_words.png
  |   `-- videos
  |       |-- video_is_worth_2000_words.mp4
  |       `-- two_videos_are_worth_4000_words.mp4
  |-- webapp
  |   `-- admin
  |       |-- users
  |       |   |-- list_users.feature
  |       |   `-- register_user.feature
  |       `-- projects
  |           |-- list_projects.feature
  |           |-- create_project.feature
  |           `-- clone_project.feature
  |-- SUMMARY.md
  `-- featurebook.json
  ```

  # TODO Describe this feature