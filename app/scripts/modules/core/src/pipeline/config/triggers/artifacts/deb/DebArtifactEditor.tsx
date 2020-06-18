import { ArtifactTypePatterns } from 'core/artifact';
import { IArtifactKindConfig } from 'core/domain';

import { singleFieldArtifactEditor } from '../singleFieldArtifactEditor';

export const DebMatch: IArtifactKindConfig = {
  label: 'Deb',
  typePattern: ArtifactTypePatterns.DEBIAN_FILE,
  type: 'deb/file',
  description: 'A Debian repository artifact.',
  key: 'deb',
  isDefault: false,
  isMatch: true,
  editCmp: singleFieldArtifactEditor('name', 'deb/file', 'Package', 'package', ''),
};

export const DebDefault: IArtifactKindConfig = {
  label: 'Deb',
  typePattern: ArtifactTypePatterns.DEBIAN_FILE,
  type: 'deb/file',
  description: 'A Debian repository artifact.',
  key: 'deb',
  isDefault: true,
  isMatch: false,
  editCmp: singleFieldArtifactEditor('name', 'deb/file', 'Package', 'package', ''),
};
